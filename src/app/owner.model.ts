export interface Owner {
  id: string,
  name: string,
  phone: string,
  email: string,
  accountType: string,
  commission: number,
  contacts: [{}],
  properties: [{}],
  notes: [{}],
  createdAt: Date
}
