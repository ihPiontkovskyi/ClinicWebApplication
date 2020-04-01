package servlet.diagnosisServlet;

import model.Diagnosis;
import model.Staff;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;

@WebServlet("/loadDiag")
public class LoadServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {
        HashSet<Diagnosis> set = getDiagnosisService().findAll();
        StringBuilder staffJson = new StringBuilder("{\"diagnosis\":[  ");
        set.forEach(e1 -> staffJson.append(e1.toJson()).append(","));
        staffJson.deleteCharAt(staffJson.length() - 1);
        staffJson.append("]}");
        PrintWriter out = response.getWriter();
        out.println(staffJson);
        out.flush();
        out.close();
    }
}