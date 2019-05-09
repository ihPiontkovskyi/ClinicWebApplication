package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;

@Data
@Entity
@Table(name = "examination")
public class Examination implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
