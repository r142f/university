import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import ru.akirakozov.sd.refactoring.database.DatabaseManager;
import ru.akirakozov.sd.refactoring.html.HtmlManager;
import ru.akirakozov.sd.refactoring.product.Product;
import ru.akirakozov.sd.refactoring.servlet.AddProductServlet;
import ru.akirakozov.sd.refactoring.servlet.GetProductsServlet;
import ru.akirakozov.sd.refactoring.servlet.QueryServlet;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLConnection;

public class Tests {
    private Server server;
    private DatabaseManager databaseManager;
    private HtmlManager htmlManager;

    @Before
    public void before() throws Exception {
        this.databaseManager = new DatabaseManager("jdbc:sqlite:test.db");
        databaseManager.createTable();

        this.server = new Server(8081);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        this.htmlManager = new HtmlManager();
        context.addServlet(new ServletHolder(new AddProductServlet(databaseManager, htmlManager)), "/add-product");
        context.addServlet(new ServletHolder(new GetProductsServlet(databaseManager, htmlManager)), "/get-products");
        context.addServlet(new ServletHolder(new QueryServlet(databaseManager, htmlManager)), "/query");

        server.start();
    }

    private String request(String url) throws Exception {
        URLConnection urlConnection = new URL("http://localhost:8081/" + url).openConnection();
        try (BufferedReader in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()))) {
            String line;
            StringBuilder sb = new StringBuilder();
            while ((line = in.readLine()) != null) {
                sb.append(line);
            }

            return sb.toString();
        }
    }

    private String requestGet() throws Exception {
        return request("get-products");
    }

    private String requestAdd(Product product) throws Exception {
        return request("add-product?name=" + product.getName() + "&price=" + product.getPrice());
    }

    private String requestQuery(String command) throws Exception {
        return request("query?command=" + command);
    }

    @Test
    public void testEmpty() throws Exception {
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);

        htmlManager.printProductsList(printWriter, Collections.emptyList());
        Assert.assertEquals(stringWriter.toString(), requestGet());
        stringWriter.getBuffer().setLength(0);

        htmlManager.printMaxPriceProduct(printWriter, null);
        Assert.assertEquals(stringWriter.toString(), requestQuery("max"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printMinPriceProduct(printWriter, null);
        Assert.assertEquals(stringWriter.toString(), requestQuery("min"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printSummaryPrice(printWriter, 0);
        Assert.assertEquals(stringWriter.toString(), requestQuery("sum"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printProductsAmount(printWriter, 0);
        Assert.assertEquals(stringWriter.toString(), requestQuery("count"));
        stringWriter.getBuffer().setLength(0);
    }

    @Test
    public void testSimpleScenario() throws Exception {
        List<Product> productsList = Arrays.asList(
                new Product("iphone", 400),
                new Product("samsung", 350),
                new Product("xiaomi", 500)
        );

        for (Product product : productsList) {
            Assert.assertEquals("OK", requestAdd(product));
        }

        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);

        htmlManager.printProductsList(printWriter, productsList);
        Assert.assertEquals(stringWriter.toString(), requestGet());
        stringWriter.getBuffer().setLength(0);

        htmlManager.printMaxPriceProduct(printWriter, productsList.get(2));
        Assert.assertEquals(stringWriter.toString(), requestQuery("max"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printMinPriceProduct(printWriter, productsList.get(1));
        Assert.assertEquals(stringWriter.toString(), requestQuery("min"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printSummaryPrice(printWriter, 1250);
        Assert.assertEquals(stringWriter.toString(), requestQuery("sum"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printProductsAmount(printWriter, productsList.size());
        Assert.assertEquals(stringWriter.toString(), requestQuery("count"));
        stringWriter.getBuffer().setLength(0);
    }

    @Test
    public void testWithUpdates() throws Exception {
        testSimpleScenario();

        List<Product> productsList = Arrays.asList(
                new Product("iphone", 400),
                new Product("samsung", 350),
                new Product("xiaomi", 500),
                new Product("nokia", 100),
                new Product("huawei", 650)
        );

        for (Product product : productsList.subList(3, 5)) {
            Assert.assertEquals("OK", requestAdd(product));
        }

        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);

        htmlManager.printProductsList(printWriter, productsList);
        Assert.assertEquals(stringWriter.toString(), requestGet());
        stringWriter.getBuffer().setLength(0);

        htmlManager.printMaxPriceProduct(printWriter, productsList.get(4));
        Assert.assertEquals(stringWriter.toString(), requestQuery("max"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printMinPriceProduct(printWriter, productsList.get(3));
        Assert.assertEquals(stringWriter.toString(), requestQuery("min"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printSummaryPrice(printWriter, 2000);
        Assert.assertEquals(stringWriter.toString(), requestQuery("sum"));
        stringWriter.getBuffer().setLength(0);

        htmlManager.printProductsAmount(printWriter, productsList.size());
        Assert.assertEquals(stringWriter.toString(), requestQuery("count"));
        stringWriter.getBuffer().setLength(0);
    }

    @After
    public void after() throws Exception {
        databaseManager.dropTable();
        databaseManager.close();
        server.stop();
    }
}