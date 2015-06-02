interface IState<TTransitions> {
	transitions?: TTransitions;
	key: string;
	defaults?: any;
	defaultTypes?: any;
	title?: string;
	route: string;
	trackCrumbTrail?: boolean;
}
export = IState;