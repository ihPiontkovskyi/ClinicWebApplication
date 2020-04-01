package servlet.diagnosis;

import model.Diagnosis;
import servlet.AbstractServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/SaveOrUpdateDiagnosis")
public class SaveOrUpdateDiagnosisServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Diagnosis currDiagnosis = new Diagnosis();
        currDiagnosis.setDiagnosisId(Integer.parseInt(getStringParam(request, "id")));
        currDiagnosis.setDiagnosisName(getStringParam(request, "name"));
        getDiagnosisService().saveOrUpdate(currDiagnosis);
    }
}