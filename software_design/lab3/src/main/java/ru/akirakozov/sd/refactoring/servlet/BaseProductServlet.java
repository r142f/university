package ru.akirakozov.sd.refactoring.servlet;

import ru.akirakozov.sd.refactoring.database.DatabaseManager;
import ru.akirakozov.sd.refactoring.html.HtmlManager;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

public abstract class BaseProductServlet extends HttpServlet {
    protected final DatabaseManager databaseManager;
    protected final HtmlManager htmlManager;

    public BaseProductServlet(DatabaseManager databaseManager, HtmlManager htmlManager) {
        this.databaseManager = databaseManager;
        this.htmlManager = htmlManager;
    }

    protected void setOkResponse(HttpServletResponse response) {
        response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}