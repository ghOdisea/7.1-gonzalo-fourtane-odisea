import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function ImageAvatar() {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="NN" src="/static/images/avatar/1.jpg" style={{marginRight:20}}/>
    </Stack>
  );
}