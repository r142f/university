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
public class AddProductServlet extends BaseProductServlet {

    public AddProductServlet(DatabaseManager databaseManager, HtmlManager htmlManager) {
        super(databaseManager, htmlManager);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = request.getParameter("name");
        long price = Long.parseLong(request.getParameter("price"));
        Product product = new Product(name, price);

        databaseManager.insert(product);

        htmlManager.printOk(response.getWriter());
        setOkResponse(response);
    }
}
