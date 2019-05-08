package model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "specialization")
public class Specialization implements Serializable {
    @Id
    private String specializationName;

    @OneToMany(mappedBy = "specialization", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Staff> staff;

    @Override
    public String toString() {
        return specializationName;
    }
}
