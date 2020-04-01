package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "patient")
public class Patient implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public String toJson() {
        return "{\"patientId\":\"" + patientId + "\", \"patientFirstName\":\"" + patientFirstName +
                "\",\"patientLastName\":\"" + patientLastName + "\", \"string\":\"" + toString() + "\", \"patientDateOfBirth\":\"" +
                patientDateOfBirth.toString() + "\"}";
    }
}
