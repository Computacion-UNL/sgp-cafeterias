import { Express } from "express";
import { allCategoriesRouter } from "./allCategory";
import { allProductsRouter } from "./allProducts";
import { changeStatusCategoryRouter } from "./changeStatusCategory";
import { changeStatusProductRouter } from "./changeStatusProduct";
import { saveCategoryRouter } from "./saveCategory";
import { saveProductRouter } from "./saveProducts";
import { updateCategoryRouter } from "./updateCategory";
import { updateProductRouter } from "./updateProduct";

const productsURI = "/api/products";
export const routes = (app: Express) => {
  //Product Routes
  app.use(productsURI, allProductsRouter);
  app.use(productsURI, saveProductRouter);
  app.use(productsURI, updateProductRouter);
  app.use(productsURI, changeStatusProductRouter);

  //Category Routes
  app.use(productsURI, allCategoriesRouter);
  app.use(productsURI, saveCategoryRouter);
  app.use(productsURI, updateCategoryRouter);
  app.use(productsURI, changeStatusCategoryRouter);
};
