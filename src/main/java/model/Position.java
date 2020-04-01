package model;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "positions")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int posId;

    private double lng;

    private double lat;

    private String address;

    @Override
    public String toString() {
        return lat + ", " + lng;
    }

    public String toJson() {
        return "{\"lat\":" + lat + ", \"lng\":" + lng + ", \"address\":\"" + address + "\"}";
    }

}
