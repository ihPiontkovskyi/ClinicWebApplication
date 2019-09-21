package servlet.examinationServlet;

import model.Examination;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;

@WebServlet("/SaveOrUpdateExamination")
public class SaveOrUpdateExaminationServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {

        Examination currExamination = new Examination();
        currExamination.setExaminationId(Integer.parseInt(getStringParam(request,"id")));
        currExamination.setPatient(getPatientService().findById(Integer.parseInt(getStringParam(request,"patientId"))));
        currExamination.setDiagnosis(getDiagnosisService().findById(Integer.parseInt(getStringParam(request,"diagnosisId"))));
        currExamination.setStaff(getStaffService().findById(Integer.parseInt(getStringParam(request,"staffId"))));
        currExamination.setTermOfTreatment(Integer.parseInt(getStringParam(request,"term")));
        currExamination.setExaminationDate(Date.valueOf(getStringParam(request,"date")));
        getExaminationService().saveOrUpdate(currExamination);
    }
}