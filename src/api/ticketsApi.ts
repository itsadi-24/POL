import { get, put, ApiResponse } from "./apiClient";

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Closed";
  date: string;
  comment?: string;
}

export async function getTickets(): Promise<ApiResponse<Ticket[]>> {
  return get<Ticket[]>("tickets");
}

export async function getTicketById(id: string): Promise<ApiResponse<Ticket>> {
  return get<Ticket>(`tickets/${id}`);
}

export async function updateTicket(id: string, ticket: Ticket): Promise<ApiResponse<Ticket>> {
  return put<Ticket>(`tickets/${id}`, ticket);
}
