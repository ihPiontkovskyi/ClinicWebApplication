package servlet;

import model.Position;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;

@WebServlet("/loadPosPoints")
public class LoadPositionPoint extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {
        HashSet<? extends Position> set = getPositionService().findAll();
        StringBuilder positionJson = new StringBuilder("{\"positionPoints\":[  ");
        set.forEach(e1 -> positionJson.append(e1.toJson()).append(","));
        positionJson.deleteCharAt(positionJson.length() - 1);
        positionJson.append("]}");
        PrintWriter out = response.getWriter();
        out.println(positionJson);
        out.flush();
        out.close();
    }
}
