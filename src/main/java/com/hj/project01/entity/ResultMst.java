package com.hj.project01.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResultMst {
    private int resultId;
    private int speed;
    private int userId;
    private int quotesId;
    private LocalDateTime saveDate;
}
