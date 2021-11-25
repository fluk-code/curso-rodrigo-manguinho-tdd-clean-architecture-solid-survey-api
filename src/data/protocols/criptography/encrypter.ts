export interface IEnctypter {
  encrypt: (value: string) => Promise<string>
}
