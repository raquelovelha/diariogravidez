export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WeekInfo {
  week: number;
  title: string;
  scripture: string;
  prayerFocus: string;
  description: string;
  fullContent: string; // Novo campo para o conteúdo completo do devocional
}

export enum AppView {
  WELCOME = 'WELCOME',
  CHAT = 'CHAT',
  INFO = 'INFO',
  JOURNEY = 'JOURNEY'
}

export enum ConversationStage {
  INITIAL_WELCOME = 'initial_welcome',
  AWAITING_GESTANTE_STATUS = 'awaiting_gestante_status',
  AWAITING_WEEK = 'awaiting_week',
  AWAITING_NON_GESTANTE_TOPIC = 'awaiting_non_gestante_topic',
  GENERAL_CHAT = 'general_chat',
}