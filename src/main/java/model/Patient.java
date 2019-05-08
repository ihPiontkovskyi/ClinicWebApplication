package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "patient")
public class Patient implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int patientId;

    private String patientFirstName;

    private String patientLastName;

    private String patientTelephone;

    private Date patientDateOfBirth;
    @OneToMany(mappedBy = "patient", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Examination> examinations;

    @Override
    public String toString() {
        return patientFirstName + " " + patientLastName;
    }
}
