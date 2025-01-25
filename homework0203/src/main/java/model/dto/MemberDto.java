package model.dto;

import java.sql.Date;

public record MemberDto(int custno, String custname, String phone, String address, Date joindate, String grade,String city) {}