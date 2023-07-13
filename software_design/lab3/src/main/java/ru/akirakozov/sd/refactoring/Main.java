package ru.akirakozov.sd.refactoring;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import ru.akirakozov.sd.refactoring.database.DatabaseManager;
import ru.akirakozov.sd.refactoring.html.HtmlManager;
import ru.akirakozov.sd.refactoring.servlet.AddProductServlet;
import ru.akirakozov.sd.refactoring.servlet.GetProductsServlet;
import ru.akirakozov.sd.refactoring.servlet.QueryServlet;

/**
 * @author akirakozov
 */
public class Main {
    public static void main(String[] args) throws Exception {
        try (DatabaseManager databaseManager = new DatabaseManager("jdbc:sqlite:test.db")) {
            databaseManager.createTable();

            Server server = new Server(8081);

            ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
            context.setContextPath("/");
            server.setHandler(context);

            HtmlManager htmlManager = new HtmlManager();
            context.addServlet(new ServletHolder(new AddProductServlet(databaseManager, htmlManager)), "/add-product");
            context.addServlet(new ServletHolder(new GetProductsServlet(databaseManager, htmlManager)), "/get-products");
            context.addServlet(new ServletHolder(new QueryServlet(databaseManager, htmlManager)), "/query");

            server.start();
            server.join();
        }
    }
}
