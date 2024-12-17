export const storageService = {
  query,
  get,
  save,
};

function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return entities;
}

async function get(entityType, entityId) {
  const entities = await query(entityType);
  const entity = entities.find((entity_1) => entity_1.id === entityId);
  if (!entity)
    throw new Error(
      `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
    );
  return entity;
}

function save(key, value) {
  localStorage[key] = JSON.stringify(value);
}
