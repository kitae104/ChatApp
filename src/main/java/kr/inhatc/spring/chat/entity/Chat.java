package kr.inhatc.spring.chat.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "chat")
public class Chat
{
	@Id
	private String id; 					// 아이디 
	
	private String msg;					// 메시지 
	
	private String sender;				// 보내는 사람 
		
	private String receiver;			// 받는 사람(귓속말)
	
	private Integer roomNum;			// 방 번호
	
	private LocalDateTime createdAt;	// 생성 시간 
}
