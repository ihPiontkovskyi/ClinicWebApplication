package servlet.patientServlet;

import model.Diagnosis;
import model.Patient;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;

@WebServlet("/loadPat")
public class LoadServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws IOException {
        HashSet<Patient> set = getPatientService().findAll();
        StringBuilder staffJson = new StringBuilder("{\"patients\":[  ");
        set.forEach(e1 -> staffJson.append(e1.toJson()).append(","));
        staffJson.deleteCharAt(staffJson.length() - 1);
        staffJson.append("]}");
        PrintWriter out = response.getWriter();
        out.println(staffJson);
        out.flush();
        out.close();
    }
}