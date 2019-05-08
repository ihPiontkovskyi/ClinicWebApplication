package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "examination")
public class Examination implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int examinationId;

    private int termOfTreatment;

    private Date examinationDate;

    @ManyToOne
    @JoinColumn(name = "patient")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "staff")
    private Staff staff;

    @ManyToOne
    @JoinColumn(name = "diagnosis")
    private Diagnosis diagnosis;
    @Override
    public String toString() {
        return patient.toString() + " " + diagnosis.toString() + " " + examinationDate.toString();
    }
}
