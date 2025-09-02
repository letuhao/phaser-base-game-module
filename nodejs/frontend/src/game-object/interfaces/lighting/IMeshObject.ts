/**
 * Mesh Object Interface
 *
 * Defines mesh object functionality for game objects.
 * Handles 3D mesh rendering and manipulation.
 */

import type { IGameObject } from '../IGameObject';
import { LightCullFaceType, GameObjectType, MeshType, MeshRenderMode } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for mesh game objects
 *
 * Extends IGameObject with mesh-specific functionality.
 */
export interface IMeshObject extends IGameObject {
  readonly gameObjectType: GameObjectType;

  /** Mesh type */
  meshType: MeshType;

  /** Mesh render mode */
  meshRenderMode: MeshRenderMode;

  /** Mesh vertices */
  meshVertices: number[];

  /** Mesh indices */
  meshIndices: number[];

  /** Mesh normals */
  meshNormals: number[];

  /** Mesh uvs */
  meshUvs: number[];

  /** Mesh colors */
  meshColors: number[];

  /** Mesh texture */
  meshTexture: Phaser.Textures.Texture | null;

  /** Mesh material */
  meshMaterial: any; // Phaser.Materials.Material

  /** Mesh shader */
  meshShader: any; // Phaser.Shaders.Shader

  /** Mesh blend mode */
  meshBlendMode: number;

  /** Mesh alpha */
  meshAlpha: number;

  /** Mesh tint */
  meshTint: number;

  /** Mesh flip x */
  meshFlipX: boolean;

  /** Mesh flip y */
  meshFlipY: boolean;

  /** Mesh scale x */
  meshScaleX: number;

  /** Mesh scale y */
  meshScaleY: number;

  /** Mesh scale z */
  meshScaleZ: number;

  /** Mesh rotation x */
  meshRotationX: number;

  /** Mesh rotation y */
  meshRotationY: number;

  /** Mesh rotation z */
  meshRotationZ: number;

  /** Mesh position x */
  meshPositionX: number;

  /** Mesh position y */
  meshPositionY: number;

  /** Mesh position z */
  meshPositionZ: number;

  /** Mesh visible */
  meshVisible: boolean;

  /** Mesh cull face */
  meshCullFace: LightCullFaceType;

  /** Mesh depth test */
  meshDepthTest: boolean;

  /** Mesh depth write */
  meshDepthWrite: boolean;

  /** Mesh wireframe */
  meshWireframe: boolean;

  /** Set mesh type */
  setMeshType(type: MeshType): this;

  /** Set mesh render mode */
  setMeshRenderMode(mode: MeshRenderMode): this;

  /** Set mesh vertices */
  setMeshVertices(vertices: number[]): this;

  /** Set mesh indices */
  setMeshIndices(indices: number[]): this;

  /** Set mesh normals */
  setMeshNormals(normals: number[]): this;

  /** Set mesh uvs */
  setMeshUvs(uvs: number[]): this;

  /** Set mesh colors */
  setMeshColors(colors: number[]): this;

  /** Set mesh texture */
  setMeshTexture(texture: Phaser.Textures.Texture | null): this;

  /** Set mesh material */
  setMeshMaterial(material: any): this;

  /** Set mesh shader */
  setMeshShader(shader: any): this;

  /** Set mesh blend mode */
  setMeshBlendMode(mode: number): this;

  /** Set mesh alpha */
  setMeshAlpha(alpha: number): this;

  /** Set mesh tint */
  setMeshTint(tint: number): this;

  /** Set mesh flip x */
  setMeshFlipX(flip: boolean): this;

  /** Set mesh flip y */
  setMeshFlipY(flip: boolean): this;

  /** Set mesh scale x */
  setMeshScaleX(scale: number): this;

  /** Set mesh scale y */
  setMeshScaleY(scale: number): this;

  /** Set mesh scale z */
  setMeshScaleZ(scale: number): this;

  /** Set mesh rotation x */
  setMeshRotationX(rotation: number): this;

  /** Set mesh rotation y */
  setMeshRotationY(rotation: number): this;

  /** Set mesh rotation z */
  setMeshRotationZ(rotation: number): this;

  /** Set mesh position x */
  setMeshPositionX(position: number): this;

  /** Set mesh position y */
  setMeshPositionY(position: number): this;

  /** Set mesh position z */
  setMeshPositionZ(position: number): this;

  /** Set mesh visible */
  setMeshVisible(visible: boolean): this;

  /** Set mesh cull face */
  setMeshCullFace(face: LightCullFaceType): this;

  /** Set mesh depth test */
  setMeshDepthTest(test: boolean): this;

  /** Set mesh depth write */
  setMeshDepthWrite(write: boolean): this;

  /** Set mesh wireframe */
  setMeshWireframe(wireframe: boolean): this;

  /** Get mesh type */
  getMeshType(): MeshType;

  /** Get mesh render mode */
  getMeshRenderMode(): MeshRenderMode;

  /** Get mesh vertices */
  getMeshVertices(): number[];

  /** Get mesh indices */
  getMeshIndices(): number[];

  /** Get mesh normals */
  getMeshNormals(): number[];

  /** Get mesh uvs */
  getMeshUvs(): number[];

  /** Get mesh colors */
  getMeshColors(): number[];

  /** Get mesh texture */
  getMeshTexture(): Phaser.Textures.Texture | null;

  /** Get mesh material */
  getMeshMaterial(): any;

  /** Get mesh shader */
  getMeshShader(): any;

  /** Get mesh blend mode */
  getMeshBlendMode(): number;

  /** Get mesh alpha */
  getMeshAlpha(): number;

  /** Get mesh tint */
  getMeshTint(): number;

  /** Get mesh flip x */
  getMeshFlipX(): boolean;

  /** Get mesh flip y */
  getMeshFlipY(): boolean;

  /** Get mesh scale x */
  getMeshScaleX(): number;

  /** Get mesh scale y */
  getMeshScaleY(): number;

  /** Get mesh scale z */
  getMeshScaleZ(): number;

  /** Get mesh rotation x */
  getMeshRotationX(): number;

  /** Get mesh rotation y */
  getMeshRotationY(): number;

  /** Get mesh rotation z */
  getMeshRotationZ(): number;

  /** Get mesh position x */
  getMeshPositionX(): number;

  /** Get mesh position y */
  getMeshPositionY(): number;

  /** Get mesh position z */
  getMeshPositionZ(): number;

  /** Get mesh visible */
  getMeshVisible(): boolean;

  /** Get mesh cull face */
  getMeshCullFace(): LightCullFaceType;

  /** Get mesh depth test */
  getMeshDepthTest(): boolean;

  /** Get mesh depth write */
  getMeshDepthWrite(): boolean;

  /** Get mesh wireframe */
  getMeshWireframe(): boolean;

  /** Update mesh */
  updateMesh(deltaTime: number): void;
}
