package servlet.diagnosisServlet;

import model.Diagnosis;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DeleteDiagnosis")
public class RemoveDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {
        Diagnosis currDiagnosis = getDiagnosisService().findById(Integer.parseInt(request.getParameter("id")));
        getDiagnosisService().delete(currDiagnosis);
    }
}