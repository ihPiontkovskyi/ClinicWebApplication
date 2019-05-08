package servlet.diagnosisServlet;

import model.Diagnosis;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/SaveOrUpdateDiagnosis")
public class SaveOrUpdateDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {
        Diagnosis currDiagnosis = new Diagnosis();
        currDiagnosis.setDiagnosisId(Integer.parseInt(request.getParameter("id")));
        currDiagnosis.setDiagnosisName(request.getAttribute("name").toString());
        currDiagnosis.setDiagnosisName(request.getAttribute("class").toString());
        getDiagnosisService().saveOrUpdate(currDiagnosis);
        forward("diagnosis.jsp", request, response);
    }
}