package servlet.examinationServlet;

import model.Diagnosis;
import model.Examination;
import servlet.AbstractServlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DeleteExamination")
public class RemoveExaminationServlet extends AbstractServlet {
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) {
        Examination currExamination = getExaminationService().findById(Integer.parseInt(getStringParam(request,"id")));
        getExaminationService().delete(currExamination);
    }
}