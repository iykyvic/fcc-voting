import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import FavoriteIcon from 'material-ui-icons/Favorite';
import Chip from 'material-ui/Chip';
import ShareIcon from 'material-ui-icons/Share';
import FacebookProvider, { Share } from 'react-facebook';
import Facebook from 'material-ui-next-community-icons/icons/facebook'
import Button from 'material-ui/Button';
import { fecthPolls } from '../services/poll.services.js';
import NoPoll from './NoPoll';

export class Polls extends Component {
  static styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: theme.palette.background.paper
    },
    gridList: {
      width: 'auto',
      height: 'auto',
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    actions: {
      display: 'flex',
    },
    more: {
      marginLeft: 'auto',
    },
    chip: {
      margin: theme.spacing.unit,
    }
  });

  static propTypes = {
    classes: PropTypes.object.isRequired,
    fetchPolls: PropTypes.func.isRequired,
    loading: PropTypes.func.isRequired,
    polls: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.string,
    author: PropTypes.string,
  };

  static defaultProps = {
    polls: [],
  };

  async componentWillMount() {
    this.props.loading(true, 'polls');
    const polls = await fecthPolls();
    this.props.fetchPolls(polls);
  }

  static formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  render() {
    let { classes, polls, status, user: { _id: author } } = this.props;
    polls = polls.filter(poll => {
      if (status && author) {
        return poll.status === status && poll.author._id === author
      }
      if (status) {
        return poll.status === status;
      }

      if (author) {
        return poll.author._id == author;
      }

      return poll;
    }).map((poll, index) => {
      const { user } = this.props;
      const {
        _id, title, author: { displayName, _id: id }, date, stats: { favs, views, votes }, status
      } = poll;
      const owner = user._id === id;
      return <Grid item key={`poll-${index}`} lg={4} md={6} xs={12}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label={title} className={classes.avatar}>
                {title[0].toUpperCase()}
              </Avatar>
            }
            action={
              <FacebookProvider appId="399546963835482">
                <Share href={`${window.location.protocol}://${window.location.host}/poll/${_id}`}>
                <Button
                  color="primary"
                  className={classes.button}
                >
                  <Facebook/> SHARE
                </Button>
                </Share>
              </FacebookProvider>
            }
            title={displayName}
            subheader={Polls.formatDate(new Date(date))}
          />
          <CardContent>
            <Typography variant="headline" component="h2">
              {title}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            {owner ? <Button href={`/poll/${_id}/edit`} className={classes.more} size="small">EDIT POLL</Button> : ''}
            <Button href={`/poll/${_id}`} size="small">GO TO POLL</Button>
          </CardActions>
        </Card>
      </Grid>
    });

    if (polls.length > 0) {
      return <div className={classes.root}>
        <Grid container  spacing={24}>
          {[...polls]}
        </Grid>
      </div>
    }
    return  <NoPoll />
  }
}


export default withStyles(Polls.styles)(Polls);
