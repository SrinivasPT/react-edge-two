import { Box, Typography, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

interface ActionBarProps {
    title: string;
    onAdd?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onRefresh?: () => void;
}

export const ActionBar = ({ title, onAdd, onEdit, onDelete, onRefresh }: ActionBarProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: '14px',
                px: '16px',
                borderBottom: '2px solid #e0e0e0',
                bgcolor: '#f0f2f5', // Changed from '#f8f9fa' to a darker shade
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <LabelImportantIcon sx={{ color: '#1976d2', fontSize: '24px' }} />
                <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                        fontWeight: 600,
                        color: '#1976d2',
                        fontSize: '1.1rem',
                    }}
                >
                    {title}
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5}>
                {[
                    { icon: <AddIcon />, label: 'Add', color: 'primary', onClick: onAdd },
                    { icon: <EditIcon />, label: 'Edit', color: 'info', onClick: onEdit },
                    { icon: <DeleteIcon />, label: 'Delete', color: 'error', onClick: onDelete },
                    { icon: <RefreshIcon />, label: 'Refresh', color: 'success', onClick: onRefresh },
                ].map((btn) => (
                    <Button
                        key={btn.label}
                        variant="contained"
                        startIcon={btn.icon}
                        color={btn.color as 'primary' | 'info' | 'error' | 'success'}
                        onClick={btn.onClick}
                        size="small"
                        sx={{
                            py: '4px',
                            minHeight: '32px',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: 1,
                            '&:hover': {
                                boxShadow: 2,
                            },
                        }}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Stack>
        </Box>
    );
};
