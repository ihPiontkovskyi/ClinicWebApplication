package servlet.examination;

import model.Examination;
import servlet.AbstractServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;

@WebServlet("/loadExam")
public class ExaminationServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {
        HashSet<? extends Examination> set = getExaminationService().findAll();
        StringBuilder staffJson = new StringBuilder("{\"exams\":[  ");
        set.forEach(e1 -> staffJson.append(e1.toJson()).append(","));
        staffJson.deleteCharAt(staffJson.length() - 1);
        staffJson.append("]}");
        PrintWriter out = response.getWriter();
        out.println(staffJson);
        out.flush();
        out.close();
    }
}