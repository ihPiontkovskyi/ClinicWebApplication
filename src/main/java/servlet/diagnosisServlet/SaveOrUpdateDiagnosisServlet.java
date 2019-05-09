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
        currDiagnosis.setDiagnosisId(Integer.parseInt(getStringParam(request,"id")));
          currDiagnosis.setDiagnosisName(getStringParam(request,"name"));
        currDiagnosis.setDiagnosisClass(getStringParam(request,"class"));
        getDiagnosisService().saveOrUpdate(currDiagnosis);
        redirectToAction("diagnosis.jsp", request, response);
    }
}