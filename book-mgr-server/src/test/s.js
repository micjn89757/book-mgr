const Schema = new mongoose.Schema({
  // ?规则字段
  
  meta: getMeta()
});

mongoose.model("SchemaName", Schema);