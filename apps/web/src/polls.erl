-module(polls).
-compile(export_all).
-include_lib("records.hrl").
	
create(User) ->
	Id = vote_core:uuid(),
	kvs:put(#poll{id = Id, user=User, title = <<"poll">>}),
	Id.

user_name(I, _, I) -> i;
user_name(User, Poll, I) ->
	case get_vote(User, Poll) of undefined -> []; V -> V#vote.name end.

get_vote(User, Poll) ->
	Vote = case kvs:get(user_poll, {User, Poll}) of
		{ok, U} -> 
			case kvs:get(vote, U#user_poll.vote) of 
				{ok, V} -> V;	
				_ -> undefined 
			end;
		_ -> undefined
	end.

user_alts(Alts, Ballot, Seed) -> 
	B = maps:from_list(Ballot),
	A = lists:zip(vote_core:rand_seq(length(Alts), Seed), Alts),
	lists:reverse(lists:sort([ {maps:get(Alt#alt.id, B, 0), Pos, Alt} || {Pos, Alt} <- A])).

put_vote(User, Poll, Name, Ballot) ->
	case get_vote(User, Poll) of
		undefined -> 
			Id = kvs:next_id(vote, 1),
			kvs:add(#vote{id=Id, feed_id={votes, Poll}, name=Name, ballot=Ballot}),
			kvs:put(#user_poll{id = {User, Poll}, vote=Id});
		Vote -> 
			kvs:put(Vote#vote{name=Name, ballot=Ballot})
	end.