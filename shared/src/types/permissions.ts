export enum Permissions {
  //Users service
  "read:entities" = "read:entities",
  "save:address" = "save:address",
  "update:address" = "update:address",

  "read:users" = "read:users",
  "changeStatus:users" = "changeStatus:users",
  "save:users" = "save:users",
  "update:users" = "update:users",

  //Products service
  "read:products" = "read:products",
  "save:products" = "save:products",
  "update:products" = "update:products",
  "changeStatus:products" = "changeStatus:products",

  "read:category" = "read:category",
  "save:category" = "save:category",
  "update:category" = "update:category",
  "changeStatus:category" = "changeStatus:category",

  // Order service
  "read:orders" = "read:orders",
  "read:receipts" = "read:receipts",
  "count:productsReceipts" = "count:productsReceipts",
  "read:receipt" = "read:receipt",
  "save:order" = "save:order",
  "save:receipt" = "save:receipt",
  "update:order" = "update:order",
}
