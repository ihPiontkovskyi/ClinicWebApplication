package servlet.diagnosis;

import model.Diagnosis;
import servlet.AbstractServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/DeleteDiagnosis")
public class RemoveDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Diagnosis currDiagnosis = getDiagnosisService().findById(Integer.parseInt(getStringParam(request, "id")));
        getDiagnosisService().delete(currDiagnosis);
    }
}