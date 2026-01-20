import { useState, useEffect } from "react";
import { Check, Clock, MessageSquare, MoreHorizontal, User, Loader2, Search, ArrowUpDown, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getTickets, updateTicket, Ticket } from "@/api/ticketsApi";
import { useToast } from "@/hooks/use-toast";

const Tickets = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"priority" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // Comment dialog state
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [commentText, setCommentText] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    const { data, error } = await getTickets();
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else if (data) {
      setTickets(data);
    }
    setLoading(false);
  };

  // Filter by search query (ID or customer name)
  const filteredTickets = tickets.filter((ticket) => {
    const query = searchQuery.toLowerCase();
    return (
      ticket.id.toLowerCase().includes(query) ||
      ticket.customer.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query)
    );
  });

  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const diff = priorityOrder[a.priority] - priorityOrder[b.priority];
      return sortOrder === "desc" ? -diff : diff;
    } else {
      // Sort by date
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    }
  });

  const handleStatusChange = async (ticket: Ticket, newStatus: Ticket["status"]) => {
    const updated = { ...ticket, status: newStatus };
    const { error } = await updateTicket(ticket.id, updated);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Ticket updated", description: `Status changed to ${newStatus}.` });
      loadTickets();
    }
  };

  const openCommentDialog = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setCommentText(ticket.comment || "");
    setCommentDialogOpen(true);
  };

  const handleSaveComment = async () => {
    if (!selectedTicket) return;
    setSaving(true);
    const updated = { ...selectedTicket, comment: commentText };
    const { error } = await updateTicket(selectedTicket.id, updated);
    if (error) {
      toast({ title: "Error", description: error, variant: "destructive" });
    } else {
      toast({ title: "Comment saved", description: "Your comment has been added to the ticket." });
      loadTickets();
    }
    setSaving(false);
    setCommentDialogOpen(false);
    setSelectedTicket(null);
    setCommentText("");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Open": return "default";
      case "In Progress": return "secondary";
      case "Closed": return "outline";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
        <p className="text-muted-foreground mt-1">
          Manage customer support requests ({tickets.length} tickets)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by ticket ID, customer name, or subject..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={(value: "priority" | "date") => setSortBy(value)}>
          <SelectTrigger className="w-full sm:w-48">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="priority">Sort by Priority</SelectItem>
            <SelectItem value="date">Sort by Date</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={toggleSortOrder} title={sortOrder === "desc" ? "Descending" : "Ascending"}>
          <ArrowUpDown className={`h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                <TableCell className="font-medium max-w-[200px] truncate" title={ticket.subject}>{ticket.subject}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    {ticket.customer}
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(ticket.status) as any}>{ticket.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {ticket.date}
                  </div>
                </TableCell>
                <TableCell>
                  {ticket.comment ? (
                    <span className="text-xs text-muted-foreground max-w-[150px] truncate block" title={ticket.comment}>
                      {ticket.comment.slice(0, 30)}{ticket.comment.length > 30 ? "..." : ""}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">No comment</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(ticket, "Open")}>Mark as Open</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(ticket, "In Progress")}>Mark In Progress</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(ticket, "Closed")}>
                        <Check className="mr-2 h-3 w-3" /> Mark as Closed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openCommentDialog(ticket)}>
                        <MessageSquare className="mr-2 h-3 w-3" /> Add/Edit Comment
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {sortedTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment to Ticket</DialogTitle>
            <DialogDescription>
              {selectedTicket && (
                <>Ticket <span className="font-mono">{selectedTicket.id}</span> - {selectedTicket.subject}</>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="comment">Your Comment</Label>
              <Textarea
                id="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a note or response for this ticket..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveComment} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Send className="mr-2 h-4 w-4" />
              Save Comment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tickets;
