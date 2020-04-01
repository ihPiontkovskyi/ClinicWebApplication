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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int specializationId;

    private String specializationName;

    @OneToMany(mappedBy = "specialization", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Staff> staff;

    @Override
    public String toString() {
        return specializationName;
    }

    public String toJson(){
        return "{\"specializationId\":\""+specializationId+"\", \"specializationName\":\""+specializationName+"\"}";
    }
}
