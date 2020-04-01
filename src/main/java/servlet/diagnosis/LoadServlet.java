package servlet.diagnosis;

import model.Diagnosis;
import servlet.AbstractServlet;

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
        HashSet<? extends Diagnosis> set = getDiagnosisService().findAll();
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