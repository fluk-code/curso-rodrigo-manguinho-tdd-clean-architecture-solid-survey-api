import { Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL as string)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getConnetion (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (data: any, _id: ObjectId): any {
    const id = String(_id)
    return {
      ...data,
      id
    }
  }
}
