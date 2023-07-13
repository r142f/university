package ru.akirakozov.sd.refactoring.servlet;

import ru.akirakozov.sd.refactoring.database.DatabaseManager;
import ru.akirakozov.sd.refactoring.html.HtmlManager;
import ru.akirakozov.sd.refactoring.product.Product;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author akirakozov
 */
public class QueryServlet extends BaseProductServlet {
    public QueryServlet(DatabaseManager databaseManager, HtmlManager htmlManager) {
        super(databaseManager, htmlManager);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String command = request.getParameter("command");

        if ("max".equals(command)) {
            Product product = databaseManager.getMaxPriceProduct();
            htmlManager.printMaxPriceProduct(response.getWriter(), product);
        } else if ("min".equals(command)) {
            Product product = databaseManager.getMinPriceProduct();
            htmlManager.printMinPriceProduct(response.getWriter(), product);
        } else if ("sum".equals(command)) {
            Integer summaryPrice = databaseManager.getSummaryPrice();
            htmlManager.printSummaryPrice(response.getWriter(), summaryPrice);
        } else if ("count".equals(command)) {
            Integer productAmount = databaseManager.getProductsAmount();
            htmlManager.printProductsAmount(response.getWriter(), productAmount);
        } else {
            htmlManager.printUnknownCommand(response.getWriter(), command);
        }

        setOkResponse(response);
    }
}
