import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import 'containers/Footer.css'
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright '}
            {new Date().getFullYear()}
            {'.'}
            <Link color="inherit" href="#">
                Mirage.W inc.
      </Link>{'All rights reserved.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <Container maxWidth="sm">
            <Typography variant="body1" align="center">
                <Copyright />
            </Typography>
        </Container>
    );
}
