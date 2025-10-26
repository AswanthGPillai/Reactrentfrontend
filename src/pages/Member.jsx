import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addMember } from '../services/allAPI';
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField,} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Member = () => {
  const [members, setMembers] = useState([]);
  const [editDialog, setEditDialog] = useState({ open: false, member: null });
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  useEffect(() => {
    const loadMembers = () => {
      const savedMembers = JSON.parse(localStorage.getItem('members') || '[]');
      setMembers(savedMembers);
    };
    loadMembers();
  }, []);


  const handleDelete = (id) => {
    const updatedMembers = members.filter(member => member.id !== id);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
    setMembers(updatedMembers);
  };


  const handleEditClick = (member) => {
    setEditDialog({ open: true, member });
    setEditName(member.name);
    setEditPhone(member.phone);
  };


  const handleEditSave = () => {
    if (!editName.trim() || !editPhone.trim()) return;

    const updatedMembers = members.map(member =>
      member.id === editDialog.member.id
        ? { ...member, name: editName.trim(), phone: editPhone.trim() }
        : member
    );

    localStorage.setItem('members', JSON.stringify(updatedMembers));
    setMembers(updatedMembers);
    setEditDialog({ open: false, member: null });
  };


  if (!members || members.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4, p: 3, border: '1px dashed #ccc' }}>
        No members registered yet.
      </Typography>
    );
  }


  const handleFinish = async () => {
    try {
      for (const member of members) {
        const memberData = {
          name: member.name,
          phone: member.phone
        };
        await addMember(memberData);
      }

      localStorage.removeItem('members');
    } catch (error) {
      console.error('Error saving members:', error);
      alert('Failed to save members to server');
      return;
    }
  };

  return (
    <div style={{ margin: "160px" }}>
      <Box sx={{ maxWidth: 800, margin: '50px auto' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Members List
        </Typography>

        <TableContainer component={Paper} elevation={5}>
          <Table aria-label="members table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white' }}>#</TableCell>
                <TableCell sx={{ color: 'white' }}>Member Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Phone Number</TableCell>
                <TableCell align="center" sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.phone}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(member)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(member.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, member: null })}>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              fullWidth
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              inputProps={{ pattern: "[0-9]*" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ open: false, member: null })}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Link
          to="/"
          style={{ textDecoration: 'none' }}
          onClick={handleFinish}
        >
          <Button variant='contained'>Finish</Button>
        </Link>
      </Box>
    </div>
  );
};

export default Member;