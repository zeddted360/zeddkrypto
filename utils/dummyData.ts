export interface ITransaction {
  id: string;
  url: string;
  message: string;
  keyword: string;
  timestamp: string;
  sender: string;
  recipient: string;
  amount: number;
}

export const dummyTransactions: ITransaction[] = [
  {
    id: "1",
    url: "https://example.com/tx/1",
    message: "Monthly salary deposit",
    keyword: "test",
    timestamp: "2024-03-20T10:30:00",
    sender: "0x2C039ff51a54aB1bE00337635A1A15e8b676224c",
    recipient: "0xf72f0D23350b5f5CD7eC9e2094751a59ae56d0ED",
    amount: 2500.0,
  },
  {
    id: "2",
    url: "https://example.com/tx/2",
    message: "Rent payment",
    keyword: "test",
    timestamp: "2024-03-19T15:45:00",
    sender: "0x2C039ff51a54aB1bE00337635A1A15e8b676224c",
    recipient: "0xf72f0D23350b5f5CD7eC9e2094751a59ae56d0ED",
    amount: -500.0,
  },
  {
    id: "3",
    url: "https://example.com/tx/3",
    message: "ATM withdrawal",
    keyword: "test",
    timestamp: "2024-03-18T09:15:00",
    sender: "0x2C039ff51a54aB1bE00337635A1A15e8b676224c",
    recipient: "0xf72f0D23350b5f5CD7eC9e2094751a59ae56d0ED",
    amount: -200.0,
  },
  {
    id: "4",
    url: "https://example.com/tx/4",
    message: "Utility bill payment",
    keyword: "real",
    timestamp: "2024-03-17T14:20:00",
    sender: "0x2C039ff51a54aB1bE00337635A1A15e8b676224c",
    recipient: "0xf72f0D23350b5f5CD7eC9e2094751a59ae56d0ED",
    amount: -1000.0,
  },
  {
    id: "5",
    url: "https://example.com/tx/5",
    message: "Freelance payment",
    keyword: "real",
    timestamp: "2024-03-16T11:00:00",
    sender: "0x2C039ff51a54aB1bE00337635A1A15e8b676224c",
    recipient: "0xf72f0D23350b5f5CD7eC9e2094751a59ae56d0ED",
    amount: 1500.0,
  },
];
