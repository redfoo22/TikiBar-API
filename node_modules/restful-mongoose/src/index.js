import resource from 'resource-router-middleware';
import { toRes } from './util';

export default function(name, model) {
	return resource({
		id : name,

		list({ params }, res) {
			var limit = Math.max(1, Math.min(50, params.limit|0 || 10));

			// if you have fulltext search enabled.
			if (params.search && typeof model.textSearch==='function') {
				return model.textSearch(params.search, {
					limit : limit,
					language : 'en',
					lean : true
				}, toRes(res));
			}

			model.find({}).skip(params.start|0 || 0).limit(limit).exec(toRes(res));
		},

		create({ body }, res) {
			model.create(body, toRes(res));
		},

		read({ params }, res) {
			model.findById(params[name], toRes(res));
		},

		update({ body, params }, res) {
			delete body._id;
			model.findByIdAndUpdate(params[name], { $set:body }, toRes(res));
		},

		delete({ params }, res) {
			model.findByIdAndRemove(params[name], toRes(res));
		}
	});
}
