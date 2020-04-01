package servlet.specialization;

import model.Specialization;
import servlet.AbstractServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;

@WebServlet("/loadSpecialization")
public class LoadServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {
        HashSet<? extends Specialization> set = getSpecializationService().findAll();
        StringBuilder json = new StringBuilder("{\"specializations\":[  ");
        set.forEach(e1 -> json.append(e1.toJson()).append(","));
        json.deleteCharAt(json.length() - 1);
        json.append("]}");
        PrintWriter out = response.getWriter();
        out.println(json);
        out.flush();
        out.close();
    }
}