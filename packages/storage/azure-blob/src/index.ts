import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

export class AzureBlob {
    private readonly containerName: string;
    private readonly blobServiceClient: BlobServiceClient;
    private readonly containerClient: ContainerClient;

    constructor(connectionString: string, containerName: string) {
        this.containerName = containerName;
        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        this.containerClient = this.blobServiceClient.getContainerClient(containerName);
    }

    async createContainer(): Promise<void> {
        try {
            const createContainerResponse = await this.containerClient.create();
            console.log(`Create container ${this.containerName} successfully`, createContainerResponse.requestId);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteContainer(): Promise<void> {
        try {
            const deleteContainerResponse = await this.containerClient.delete();
            console.log(`Delete container ${this.containerName} successfully`, deleteContainerResponse.requestId);
        } catch (error) {
            console.log(error);
        }
    }

    async listBlobs(): Promise<void> {
        let i = 1;
        for await (const blob of this.containerClient.listBlobsFlat()) {
            console.log(`Blob ${i++}: ${blob.name}`);
        }
    }

    async uploadFile(filePath: string, fileName: string): Promise<void> {
        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
        const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
    }

    async uploadData(buffer: Buffer | Blob | ArrayBuffer | ArrayBufferView, fileName: string): Promise<void> {
        const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
        const uploadBlobResponse = await blockBlobClient.uploadData(buffer);
    }
}
