package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "staff")
public class Staff implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int staffId;

    private String fullName;

    @ManyToOne
    @JoinColumn(name = "specialization")
    private Specialization specialization;

    @OneToMany(mappedBy = "staff", orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Examination> examinations;

    @Override
    public String toString() {
        return specialization + " " + fullName;
    }

    public String toJson() {
        return "{\"staffId\":\"" + staffId + "\", \"fullName\":\"" + fullName+"\", \"string\":\"" + toString() + "\",\"specialization\":\"" + specialization.getSpecializationId() + "\"}";
    }
}
