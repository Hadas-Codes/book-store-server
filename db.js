export let books = [
  {
    code: "101",
    title: "The Great Gatsby",
    category: "Classic Literature",
    price: 49.90,
    isBorrowed: false,
    borrowHistory: [] 
  },
  {
    code: "102",
    title: "The Hobbit",
    category: "Fantasy",
    price: 59.90,
    isBorrowed: true,
    borrowHistory: [
      {
        borrowDate: "2026-07-01",
        customerId: "cust_505"
      }
    ]
  }
];