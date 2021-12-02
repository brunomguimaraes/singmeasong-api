import connection from '../database/connection.js';

class RecommendationRepository {
  async create({ name, youtubeLink }) {
    const result = await connection.query(
      'INSERT INTO recommendations (name, youtube_link) VALUES ($1, $2) RETURNING *;',
      [name, youtubeLink]
    );
    return result.rows[0];
  }

  async findByLink({ youtubeLink }) {
    const result = await connection.query(
      'SELECT * FROM recommendations WHERE youtube_link = $1;',
      [youtubeLink]
    );
    return result.rows[0];
  }

  async findById({ id }) {
    const result = await connection.query(
      'SELECT * FROM recommendations WHERE id = $1;',
      [id]
    );
    return result.rows[0];
  }

  async upvote({ id }) {
    const result = await connection.query(
      'UPDATE recommendations SET score = score + 1 WHERE id = $1 RETURNING *;',
      [id]
    );
    return result.rows[0];
  }

  async downvote({ id }) {
    const result = await connection.query(
      'UPDATE recommendations SET score = score - 1 WHERE id = $1 RETURNING *;',
      [id]
    );
    return result.rows[0];
  }

  async deleteById({ id }) {
    await connection.query('DELETE FROM recommendations WHERE id = $1;', [id]);
  }
}

export default RecommendationRepository;