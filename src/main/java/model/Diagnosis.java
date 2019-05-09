package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "diagnosis")
public class Diagnosis implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int diagnosisId;

    private String diagnosisName;

    private String diagnosisClass;

    @OneToMany(mappedBy = "diagnosis", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Examination> examinations;

    @Override
    public String toString() {
        return diagnosisName;
    }
}
